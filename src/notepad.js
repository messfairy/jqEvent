define(['../src/note'], function (note) {

    var notes = [
        new note('pick up the kids', 'dont forget to pick  up the kids'),
        new note('get milk', 'we need two gallons of milk')
    ];


    return {
        noteTitles: function () {
            var val='';

            for (var i = 0, ii = notes.length; i < ii; i++) {
                //alert(notes[i].title);
                val += notes[i].title + ' ';
            }

            return val.substring(0, val.length-1);
        }
    };
});