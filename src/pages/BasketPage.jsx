import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBasket } from '../redux/actions/basketActions';
import Loader from './../components/Loader';
import BasketItem from '../components/BasketItem';

const BasketPage = () => {
  const store = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  // api'dan sepete eklenen ürünleri al ve store'a aktar
  useEffect(() => {
    dispatch(getBasket());
  }, []);

  const total = store.basket.reduce(
    (total, item) => total + item.amount * item.price,
    0
  );

  return (
    <div className="container">
      <div className="row d-flex justify-content-center mx-auto gap-1 p-4">
        <div style={{ maxWidth: "700px" }} className="col-md-8">
          {store.isLoading && <Loader />}

          {store.isError && <h3>{store.isError}</h3>}

          {store.basket.map((product) => (
            <BasketItem key={product.id} product={product} />
          ))}
           {store.basket.length === 0 && (
            <p className="d-flex align-items-center gap-3 my-4 rounded-2 justify-content-between fw-bold text-black p-3 fs-3 bg-white   ">
              Sepete ürün ekleyin
            </p>
          )}
        </div>
        <div style={{ minWidth: "400px "}} className="col-md-4">
          <div className="bg-white p-5 rounded w-100 text-black my-4">
            <h5>Toplam Tutar: {total}$</h5>
            <button className="bg-black text-white w-100 mt-3">Alışverişi Tamamla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;