const OrderTemplate = ({ left, right }) => (
  <div className="order-page grid md:grid-cols-2 md:p-8 w-full md:w-7/8 m-auto">
    <div className="w-full m-auto px-5 mt-0">{left}</div>
    <div className="w-full mx-auto px-5">{right}</div>
  </div>
);

export default OrderTemplate;
