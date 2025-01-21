import PropTypes from "prop-types";

const Accordion = ({ title, content, index, toggleIndex, openIndex }) => {
  return (
    <>
      <div
        className={`flex items-center p-6 ${openIndex === index ? "pb-2" : ""}`}
      >
        <p className="font-bold">{title}</p>
        <button
          className="  font-extrabold p-0 text-red-500 ml-auto mr-2 trandform hover:-scale-150 transition-transform duration-200"
          onClick={toggleIndex}
          aria-label="Toggle Accordion"
        >
          {openIndex === index ? "-" : "+"}
        </button>
      </div>
      {openIndex === index && <p className="pl-6 pb-2 ">{content}</p>}
    </>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  openIndex: PropTypes.number,
  index: PropTypes.number.isRequired,
  toggleIndex: PropTypes.func.isRequired,
};

export default Accordion;
