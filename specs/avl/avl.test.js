/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Node {
	constructor(value) {
		this.left = null;
		this.right = null;
		this.value = value;
		this.height = 1;
	}

	// recursive
	// this add() method call the add() method on its children
	add(value) {
		// decide to go left or right
		if (value < this.value) {
			// go left
			// if I have left child
			// find the correct place to add
			if (this.left) {
				this.left.add(value);
			} else {
				this.left = new Node(value);
			}

			// update height
			if (!this.right || this.right.height < this.left.height) {
				this.height = this.left.height + 1;
			}
		} else {
			// go right
			if (this.right) {
				this.right.add(value);
			} else {
				this.right = new Node(value);
			}

			if (!this.left || this.right.height < this.left.height) {
				this.height = this.right.height + 1;
			}
		}

		this.balance();
	}

	// (on the way up from the recursion)
	// unbalanced, right heavy, child is right heavy
	// unbalanced, left heavy, child is left heavy
	balance() {
		const rightHeight = this.right ? this.right.height : 0;
		const leftHeight = this.left ? this.left.height : 0;
		// ask is this node out of balance (by checking the height)
		// if NOT out of balance, do nothing
		if (leftHeight > rightHeight + 1) {
			const leftRightHeight = this.left.right
				? this.left.right.height
				: 0;

			const leftLeftHeight = this.left.left ? this.left.left.height : 0;
			// if it's OUT of balance, do I need to single OR double rotate
			// if double, call rotate on child - then on self
			if (leftRightHeight > leftLeftHeight) {
				// double rotation
				this.left.rotateRR();
			}
			// if single, just call rotate on self
			this.rotateLL();
		} else if (rightHeight > leftHeight + 1) {
			const rightRightHeight = this.right.right
				? this.right.right.height
				: 0;
			const rightLeftHeight = this.right.left
				? this.right.left.height
				: 0;

			// double rotation
			if (rightLeftHeight > rightRightHeight) {
				this.right.rotateLL();
			}

			this.rotateRR();
		}
	}

	// if the Right child is heavy
	// from the right to the left
	rotateRR() {
		// rotate
		const valueBefore = this.value;
		const leftBefore = this.left;

		this.value = this.right.value;
		this.left = this.right;
		this.right = this.right.right;
		this.left.right = this.left.left;
		this.left.left = leftBefore;
		this.left.value = valueBefore;

		this.left.updateInNewLocation();
		this.updateInNewLocation();
	}

	// if the Left child is heavy
	// from the left to the right
	rotateLL() {
		// rotate
		const valueBefore = this.value;
		const rightBefore = this.right;

		this.value = this.left.value;
		this.right = this.left;
		this.left = this.left.left;
		this.right.left = this.right.right;
		this.right.right = rightBefore;
		this.right.value = valueBefore;

		this.right.updateInNewLocation();
		this.updateInNewLocation();
	}

	updateInNewLocation() {
		// calc the new height
		// do I have left ch, right ch? if I have neither, then I'm of height 1...

		// if there are no children (leaf node)
		if (!this.right && !this.left) {
			this.height = 1;
		} else if (
			// if the left ch has greater height - use it height + 1
			// if I don't have right ch || I have left ch && the right height < left height
			// so we need to take the height from the left
			!this.right ||
			(this.left && this.right.height < this.left.height)
		) {
			this.height = this.left.height + 1;
		} else {
			// otherwise use the right ch
			this.height = this.right.height + 1;
		}
	}
}

class Tree {
	constructor() {
		this.root = null;
	}

	add(value) {
		if (!this.root) {
			this.root = new Node(value);
		} else {
			this.root.add(value);
		}
	}

	// for visialization only
	toObject() {
		return this.root;
	}
}

// unit tests
// do not modify the below code
describe("AVL Tree", function () {
	test("creates a correct tree", () => {
		const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
		const tree = new Tree();
		nums.map((num) => tree.add(num));
		const objs = tree.toObject();

		expect(objs.value).toEqual(4);

		expect(objs.left.value).toEqual(2);

		expect(objs.left.left.value).toEqual(1);
		expect(objs.left.left.left).toBeNull();
		expect(objs.left.left.right).toBeNull();

		expect(objs.left.right.value).toEqual(3);
		expect(objs.left.right.left).toBeNull();
		expect(objs.left.right.right).toBeNull();

		expect(objs.right.value).toEqual(7);

		expect(objs.right.left.value).toEqual(6);
		expect(objs.right.left.right).toBeNull();

		expect(objs.right.left.left.value).toEqual(5);
		expect(objs.right.left.left.left).toBeNull();
		expect(objs.right.left.left.right).toBeNull();

		expect(objs.right.right.value).toEqual(9);

		expect(objs.right.right.left.value).toEqual(8);
		expect(objs.right.right.left.left).toBeNull();
		expect(objs.right.right.left.right).toBeNull();

		expect(objs.right.right.right.value).toEqual(10);
		expect(objs.right.right.right.left).toBeNull();
		expect(objs.right.right.right.right).toBeNull();
	});
});
