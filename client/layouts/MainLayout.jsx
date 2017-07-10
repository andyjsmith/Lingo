import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const MainLayout = ({content}) => (
	<div>
		<div>
			<main className="container">
				<Header />
				{content}
				<Footer />
			</main>
		</div>
	</div>
);
