import { useEffect, useState } from "react";
import { loadVGSCollect } from "@vgs/collect-js";

import "./style.css";

const App = () => {
	const [form, setForm] = useState({});
	const [response, setResponse] = useState({});

	useEffect(() => {
		(async () => {
			const vgs_collect = await loadVGSCollect({
				// put your VGS vault ID in a .env file
				vaultId: process.env.REACT_APP_VGS_VAULT_ID || "",
				environment: "sandbox",
				version: "2.4.0"
			});

			// @ts-ignore
			const form = vgs_collect.init(state => console.log(state));
			form
				.field("#ssn", {
					type: "text",
					name: "ssn",
					placeholder: "XXX-XX-XXXX",
					validations: ["required"],
					css: { fontSize: "16px" }
				})
				.mask("999-99-9999", " ");

			setForm(form);
		})();
	}, []);

	// @ts-ignore
	const handleFormSubmit = e => {
		e.preventDefault();

		// @ts-ignore
		form.submit("/post", {}, (_status, data) => {
			setResponse(data);
		});
	};

	return (
		<>
			<form>
				<div className="group">
					<span id="ssn" className="form-field">
						{/* VGS Collect iframe for the SSN field will be here! */}
					</span>
				</div>

				<button type="submit" onClick={handleFormSubmit}>
					Redact
				</button>
			</form>

			<div className="response-container">
				{/* @ts-ignore */}
				<pre id="response">{response.data}</pre>
			</div>
		</>
	);
};

export default App;
