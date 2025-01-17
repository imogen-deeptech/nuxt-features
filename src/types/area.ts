import path from "path";

export class Area {
	public constructor(
		public name: string,
		public rootDirectory: string,
	) {}

	public getRoot() {
		return path.resolve(this.rootDirectory, this.name);
	}

	public getDirectory(directoryName: string) {
		return path.resolve(this.getRoot(), directoryName);
	}
}
