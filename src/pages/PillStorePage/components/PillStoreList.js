import PillStore from "./PillStore";

const PillStoreList = ({ pillStoreList, filter, access, selectedPillStore}) => {
  const lowerCaseFilter = filter.toLowerCase();

  const passRequirement = (pillStore) =>
    (filter === "" ||
      pillStore.pharmacy.toLowerCase().includes(lowerCaseFilter) ||
      pillStore.location.toLowerCase().includes(lowerCaseFilter)) &&
    (pillStore.status === access || !access || (selectedPillStore.ID === pillStore.ID)); //check box filter

  return (
    <>
      {pillStoreList
        .filter((pillStore) => passRequirement(pillStore))

        .map((pillStore) => {
          //Debug
          //console.log(index)
          return <PillStore key={pillStore.ID} pillStore={pillStore} />
        })
      }
    </>
  );
};

export default PillStoreList;
