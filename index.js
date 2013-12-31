function main(Pipe, job, timeout) {

    function render(q) {
        return q.map(function(p) {
            return '<div class="proc-' + p + '">Process ' + p + '</div>';
        }).join('');
    }

    function peekn(array, n) {
        var len = array.length,
            res = len > n ? array.slice(len - n) : array;
        return res;
    }
    
    // Eg 1
    (function() {
        var pipe = new Pipe(),
            out = document.getElementById('eg1out');

        job(function* () {
            while (true) {
                yield timeout(250).get();
                yield pipe.put(1);
            }
        });

        job(function* () {
            while (true) {
                yield timeout(1000).get();
                yield pipe.put(2);
            }
        });

        job(function* () {
            while (true) {
                yield timeout(1500).get();
                yield pipe.put(3);
            }
        });


        job(function* () {
            var data = [],
                newItem;
            
            while (true) {
                out.innerHTML = render(data);
                newItem = yield pipe.get();
                data.push(newItem);
                data = peekn(data, 10);
            }
        });
        
    })();

}


main(JSPipe.Pipe, JSPipe.job, JSPipe.timeout);
