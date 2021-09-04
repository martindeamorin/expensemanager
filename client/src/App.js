import './App.css';
import AppRouter from './router/AppRouter';
import StoreProvider from './store/StoreProvider';
function App() {
  return (
    <StoreProvider>
      <AppRouter/>
    </StoreProvider>
  );
}

export default App;
