export default function Avatar({ image, alt, className }) {
  return (
      <img src={image} alt={alt} className={`w-16 h-16 rounded-full object-cover ${className}`} />
  );
}