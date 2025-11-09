import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Canopy",
  description = "This is the Chat App called Canopy",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
