import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text = "submit", className = "btn btn-block form-btn" }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button type="submit" className={className} disabled={isSubmitting}>
      {isSubmitting ? "submitting..." : text}
    </button>
  );
};

export default SubmitBtn;