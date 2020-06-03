const url1 = "https://test-hermes.profisms.cz/work-tests/test1.php";
const url2 = "https://test-hermes.profisms.cz/work-tests/test1a.php";

(async () => {
	const getResponse = await fetch(url1);
	if (getResponse.ok){
		const result = await getResponse.json();
		const shaContent = result.content.crypto;
		console.log(shaContent);
		const postResponse = await fetch(url2, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": result.content,
				"sha256": "crypting value of result.content"
			})
		});
		if (postResponse.ok){
			document.writeln("OK");
			console.log("OK");
		} else {
			document.writeln("NOT GOOD!");
		}
	}
})();


//const getPromiseData = () => {
//	const promise = fetch(url).then(promise => promise.json()).then(result => console.log(result));
//}

//getPromiseData();