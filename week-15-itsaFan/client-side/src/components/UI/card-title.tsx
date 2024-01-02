type Props = {
  title: string;
};

export default function CardTitle({ title }: Props) {
  return <h2 className="text-center text-3xl font-bold mb-5 ">{title}</h2>;
}
