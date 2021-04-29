import PillStore from "./PillStore";

const PillStoreList = ({ pillStoreList, filter, access, onChange }) => {
  const lowerCaseFilter = filter.toLowerCase();

  const passRequirement = (pillStore) =>
    (filter === "" ||
      pillStore.pharmacy.toLowerCase().includes(lowerCaseFilter) ||
      pillStore.location.toLowerCase().includes(lowerCaseFilter)) &&
    (pillStore.status === access || !access); //check box filter

  return (
    <>
      {pillStoreList
        .filter((pillStore) => passRequirement(pillStore))

        .map((pillStore) => (
          <PillStore key={pillStore.id} pillStore={pillStore} />
        ))}
    </>
  );
};

export default PillStoreList;
