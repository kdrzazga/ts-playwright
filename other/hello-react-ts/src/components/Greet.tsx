type GreetProps = {
	name: string;
	messageCount: number;
	loggedIn: boolean;
}

export const Greet = (props: GreetProps) => {
	return (
		<div>
			<h2> 
			{props.loggedIn
				 ? "Welcome " + props.name + "! You have " + props.messageCount + " unread messages."
				: 'Welcome Guest !'	}
			</h2>
		</div>
	)
}