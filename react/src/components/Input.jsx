export default function Input() {
    return (
        <input type="placeholder" onChange={() => { console.log('change'); }}/>
    )
}