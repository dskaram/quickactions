define(['QuickAction'], function(QuickAction) {

    describe('QuickAction', function() {
        it('should throw an exception on binding without provider', function() {
            try {
              QuickAction.create().bind();
            } catch (e) {
              return; // passed
            }

            expect(true).to.be.false;
        });
    });

});
