import AdminNavbar from '@/components/adminNavbar';

export default function AdminLayout({ children }) {
  return (
    <section>
      <AdminNavbar />
      <main>{children}</main>
    </section>
  );
}
