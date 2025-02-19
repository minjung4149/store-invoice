import Header from "@/components/header/Header";
import ClientList from "@/components/main/ClientList";

const MainPage = () => {
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

export default MainPage;
