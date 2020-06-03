const url1 = "https://test-hermes.profisms.cz/work-tests/test1.php";
const url2 = "https://test-hermes.profisms.cz/work-tests/test1a.php";

(async () => {
	const getResponse = await fetch(url1);
	if (getResponse.ok){
		const result = await getResponse.json();
		const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder("utf-8").encode(result.content));
		const shaContent = Array.prototype.map.call(new Uint8Array(buffer), x=>(('00'+x.toString(16)).slice(-2))).join('');
		console.log(shaContent);
		const postResponse = await fetch(url2, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": result.content,
				"sha256": shaContent
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