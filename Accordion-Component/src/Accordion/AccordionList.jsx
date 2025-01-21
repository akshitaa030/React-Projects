import { data } from "../assets/Data";
import Accordion from "./Accordion";
import { useState } from "react";

const AccordionList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  function toggleIndex(index) {
    return openIndex === index ? null : index; //clicking on already clicked item will close it else it'll open the item present at index
  }
  return (
    <ul className="xl:ml-60 xl:mr-60 lg:ml-36 lg:mr-36 md:ml-20 md:mr-20 sm:ml-2 sm:mr-2 mt-6">
      {data.map((item, index) => (
        <li key={index} className="border-b border-gray-300">
          <Accordion
            index={index}
            title={item.title}
            content={item.content}
            toggleIndex={() => setOpenIndex(toggleIndex(index))} // Pass function reference to toggle the index
            openIndex={openIndex}
          />
        </li>
      ))}
    </ul>
  );
};

export default AccordionList;
