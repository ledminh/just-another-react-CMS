function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

  //then can be used as

  const [username, userInput] = useInput({ type: "text" });
 const [password, passwordInput] = useInput({ type: "text" });

 return <>
   {userInput} -> {username} <br />
   {passwordInput} -> {password}
 </>;