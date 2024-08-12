"use client";

import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { onboardUser } from "~/actions/onboard-user";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button
          className={styles.secondary}
          onClick={() => {
            const rand = Math.floor(Math.random() * 1000);
            onboardUser(`User ${rand}`, `Org ${rand}`, `Project ${rand}`);
          }}
        >
          Onboard
        </Button>
      </main>
    </div>
  );
}
