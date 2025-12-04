import { Pool } from "pg";

import { Question } from "@/lib/Question";
import { Order } from "@/lib/Order";

/**
 * Database class
 * Handles database connections and queries
 */
export class Database {
  private static instance: Database;
  private readonly pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: "db",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 5432,
      database: "app",
    });

    this.pool.connect((err, client, done) => {
      if (err) {
        done();

        return;
      }
      done();

      const createQuestionTable = `
          CREATE TABLE IF NOT EXISTS questions
          (
              "questionID" SERIAL PRIMARY KEY,
              "fullname"   VARCHAR(255) NOT NULL,
              "email"      VARCHAR(255) NOT NULL,
              "order"      VARCHAR(255),
              isclient     BOOLEAN      NOT NULL,
              "reason"     TEXT         NOT NULL CHECK ("reason" IN ('question', 'complain', 'refund', 'bigger')),
              "message"    TEXT         NOT NULL
          );
      `;

      const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS orders
        (
            "orderId" SERIAL PRIMARY KEY,
            "fullname" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL,
            "plan" VARCHAR(255) NOT NULL,
            "yearly" BOOLEAN NOT NULL,
            "additionalsize" INT NOT NULL,
            "domainoption" TEXT NOT NULL,
            "domainname" TEXT,
            "users" TEXT[],
            "price" DECIMAL(10, 2) NOT NULL
        );
      `;

      client!.query(createQuestionTable);
      client!.query(createOrdersTable);
    });
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  async addQuestion(question: Question): Promise<void> {
    const sql = `INSERT INTO questions (fullname, email, "order", isclient, reason, message) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [
      question.fullname,
      question.email,
      question.order,
      question.isclient,
      question.reason,
      question.message,
    ];

    try {
      await this.pool.query(sql, values);
    } catch (_) {
      throw _;
    }
  }

  async addOrder(order: Order): Promise<void> {
    const sql = `INSERT INTO orders (fullname, email, plan, yearly, additionalsize, domainoption, domainname, users, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
      order.fullname,
      order.email,
      order.plan,
      order.yearly,
      order.additionalsize,
      order.domainoption,
      order.domainname,
      order.users,
      order.price,
    ];

    try {
      await this.pool.query(sql, values);
    } catch (_) {
      throw _;
    }
  }
}
