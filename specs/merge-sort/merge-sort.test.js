/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (left, right) => {
	// return one sorted array
	// left and right are already sorted!
	const results = [];

	while (left.length && right.length) {
		// shift (dequeue) - popping from the front; removes the 1st item in the arr
		// and returns it
		if (left[0] <= right[0]) {
			results.push(left.shift());
		} else {
			results.push(right.shift());
		}
	}

	// eventually on of the arrays will run out of elements, so:
	return results.concat(left, right);
	// results will be an already sorted list and one of left and right is gonna be
	// empty; we know that everything that's left is going to be larger than what's
	// already in resilts cause it's the end of that array
};

const mergeSort = (nums) => {
	// base case, return if length 1 or 0
	if (nums.length < 2) {
		return nums;
	}

	// break into 2 smaller arrays
	const length = nums.length;
	const middle = Math.floor(length / 2);
	const left = nums.slice(0, middle);
	const right = nums.slice(middle);

	// call merge sort on left and right
	const sortedLeft = mergeSort(left);
	const sortedRight = mergeSort(right);

	// return the merge of left and right
	return merge(sortedLeft, sortedRight);
};

// unit tests
// do not modify the below code
test("merge sort", function () {
	const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
	const ans = mergeSort(nums);
	expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
