export class CreateFreeAgentInput {
	name: string
	surname: string
}

export class UpdateFreeAgentInput {
	_id: string
	name?: string
	surname?: string
}

export class FiltersFreeAgent {
	ids?: string[]
	searchText?: string
}
