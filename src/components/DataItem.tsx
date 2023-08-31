export interface DataItemProps {
  label: string
  value: number
}

const DataItem: React.FC<DataItemProps> = ({ label, value }) => {
  return (
    <div className="text-center bg-base-200 p-2 rounded-lg">
      <div className="text-2xl 2xl:text-3xl">{value}</div>
      <div className="text-xs 2xl:text-md uppercase">{label}</div>
    </div>
  )
}

export default DataItem
