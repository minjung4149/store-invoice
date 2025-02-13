import Header from "@/components/header/Header";
import ClientList from "@/components/ClientList";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">
            <section>
              {/*고객 리스트*/}
              <ClientList/>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
