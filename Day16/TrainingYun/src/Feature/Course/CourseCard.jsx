export default function CourseCard({ title, duration, discount, price }) {
  return (
    <div className="card" style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h2>{title}</h2>
      <p>Duration: {duration}</p>
      <p>Discount: {discount}</p>
      <p>Price: ₹{price}</p>
    </div>
  );
}