
interface Props {
    label : string, 
    name : string,
    type : string,
    placeholder : string,
    value : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
    error ?: string
}

const AuthInputs : React.FC<Props> = ({ label , name , type , placeholder , value , onChange , error} : Props) => {


  return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            <input
            id={name} 
            name={name}
            value={value}
            onChange={onChange}
              type={type}
              placeholder={placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
  )
}

export default AuthInputs
