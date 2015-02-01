define(["../../src/notepad"], function (notepad) {
    describe("returns titles", function () {

        it("something", function() {

            expect(notepad.noteTitles()).toEqual("pick up the kids get milk");
        });

    });
});