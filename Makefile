thrift: # Make thrift generated files
	cd thrift_files && thrift -r --gen js:node test.thrift

lint: # run linting.
	./node_modules/.bin/eslint ./
