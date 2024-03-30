import MyPurchasesCard from '../my-purchases-card/my-purchases-card';

function MyPurchasesList():JSX.Element{
  return (
    <ul className="my-purchases__list">
      <MyPurchasesCard/>
    </ul>
  );
}
export default MyPurchasesList;
