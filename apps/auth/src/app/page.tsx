import Link from "next/link";

export default function Index() {
  return (
    <div>
      <Link href="/login">Sign in</Link>
      <form action="/logout" method="POST">
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}
