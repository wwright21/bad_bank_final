const [storageItem, setStorageItem] = useState(
  localStorage.getItem("myKey") || ""
);

useEffect(() => {
  // Function to call when the storage event is triggered
  const handleStorageChange = (event) => {
    if (event.key === "myKey") {
      setStorageItem(event.newValue || "");
    }
  };

  // Add storage event listener
  window.addEventListener("storage", handleStorageChange);

  // Cleanup listener on component unmount
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

// Additional effect to handle changes made within the same tab
useEffect(() => {
  // This is a custom function you might implement to listen for changes made in the same tab
  const listenForInternalChanges = () => {
    const newValue = localStorage.getItem("myKey") || "";
    if (newValue !== storageItem) {
      setStorageItem(newValue);
    }
  };

  // Example: You could trigger this function whenever you update localStorage in your app
  // For demonstration purposes, let's just call it once
  listenForInternalChanges();

  // Depending on your application, you might call this function in response to specific events
}, [storageItem]);
