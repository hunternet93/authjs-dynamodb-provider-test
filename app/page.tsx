import styles from "./page.module.css";
import { auth, signIn } from "./auth";
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("sendgrid", formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Signin with Sendgrid</button>
    </form>
  )
}

export default async function Home() {
  const session = await auth()
  console.debug('session is', session)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {session ?
            `Successfully logged in as ${session.user?.email}`
            : <SignIn />}
      </main>
    </div>
  );
}
