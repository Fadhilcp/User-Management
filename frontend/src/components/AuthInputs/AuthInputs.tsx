
interface Props {
    label : string, 
    name : string,
    type : string,
    placeholder : string
}

const AuthInputs : React.FC<Props> = ({ label , name , type , placeholder} : Props) => {


  return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            <input
            id={name} 
            name={name}
              type={type}
              placeholder={placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
        </div>
  )
}

export default AuthInputs
