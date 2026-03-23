import CourseCard from "./CourseCard";

export const CourseList = ({ items }) => {
  if (!items) return <p>Loading courses...</p>;

  return (
    <>
      {items.map((course) => (
        <CourseCard
          key={course.title}
          title={course.title}
          duration={course.duration}
          discount={course.discount}
          price={course.price}
        />
      ))}
    </>
  );
};