import BooksSection from './components/BooksSection'
import Header from './components/Header'
import ModalProvider from './providers/ModalProvider'

function App() {
  return (
    <>
      <Header />
      <ModalProvider>
        <main>
          <BooksSection />
        </main>
      </ModalProvider>
    </>
  )
}

export default App
