/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
	// sorting part
	array = createMaxHeap(array);

	for (let i = array.length - 1; i > 0; i--) {
		swapPlace(0, i, array);
		heapify(array, 0, i);
	}
	return array;
};

const createMaxHeap = (array) => {
	for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
		// heapSize = array.length -> cause len of our arr changes;
		// exclude everything before cause it's sorted already
		heapify(array, i, array.length);
	}

	return array;
};

const heapify = (array, index, heapSize) => {
	const leftChild = 2 * index + 1;
	const rightChild = 2 * index + 2;

	// keep track of where is the largest value index
	let largestValueIndex = index;

	if (heapSize > leftChild && array[largestValueIndex] < array[leftChild]) {
		largestValueIndex = leftChild;
	}

	if (heapSize > rightChild && array[largestValueIndex] < array[rightChild]) {
		largestValueIndex = rightChild;
	}

	// no I need to do smth
	// BASE CASE: either a swap doesn't happen OR you go out of bounds
	if (largestValueIndex !== index) {
		swapPlace(index, largestValueIndex, array);
		// call heapify() on the child
		heapify(array, largestValueIndex, heapSize);
	}
};

const swapPlace = (parentIndex, childIndex, array) => {
	// swap 2 items in an array
	const buff = array[parentIndex];

	array[parentIndex] = array[childIndex];
	array[childIndex] = buff;

	return array;
};

// unit tests
// do not modify the below code
test("heap sort", function () {
	const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
	heapSort(nums);
	expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
