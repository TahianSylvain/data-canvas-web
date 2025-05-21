import CreateDatabaseForm from "@/components/createDatabaseForm/page";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import Acceuil from "../home/page";

export default function test() {
	return <div className="h-screen w-screen">
		<Header />
		<Sidebar />
		<Acceuil/>
	</div>
}