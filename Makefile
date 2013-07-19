
build: components index.js
	@component build

components: component.json
	@component install --dev

clean:
	rm -fr build

.PHONY: clean
