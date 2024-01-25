const addReservation = async (reservationData) => {
      try {
            console.log(reservationData);
            const response = await fetch("http://localhost:1234/add", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                  console.error(
                        "Server returned an error:",
                        response.status,
                        response.statusText
                  );
                  throw new Error("Failed to save reservation information");
            }
            console.log("Reservation saved successfully!"); 
            } catch (error) {
                  console.error("Error saving reservation info:", error.message);
            }
      };

      export default addReservation;
      
