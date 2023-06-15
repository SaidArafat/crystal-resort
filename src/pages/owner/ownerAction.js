import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOwner } from "./../../store/slices/ownerSlice";
import List from "../../components/common/list";
import StatusIndicator from "../../components/common/statusIndicator";

const OwnerAction = ({ id }) => {
  const { ownerDetails, isLoading, error } = useSelector(
    (state) => state.owners
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwner(id));
  }, [dispatch, id]);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      {ownerDetails && <List items={ownerDetails} itemsTitle="Owner" />}
    </StatusIndicator>
  );
};

export default OwnerAction;
