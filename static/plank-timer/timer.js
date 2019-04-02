
class TM {
    constructor(ele){
        this.minutes = 0;
        this.seconds = 0;
        this.startMinutes = 0;   // 当前次计次的开始时间
        this.startSeconds = 0;
        this.recordNo = 0;  // 计次序号，0开始
        this.ele = ele;
        this.intervalid = null;

        $(ele).on('click', '[data-btn-start]', e=>this.start())
        $(ele).on('click', '[data-btn-suspend]', e=>this.suspend())
        $(ele).on('click', '[data-btn-record]', e=>this.record())
        $(ele).on('click', '[data-btn-resume]', e=>this.resume())
        $(ele).on('click', '[data-btn-reset]', e=>this.reset())
    }

    start(){
        this.intervalid = setInterval(()=>this.increase(), 100);

        $('.tm-btn-list', this.ele).empty().append(`
            <button class="tm-btn" data-btn-suspend=''>暂停</button>
            <button class="tm-btn" data-btn-record=''>计次</button>
        `)
    }

    suspend(){
        clearInterval(this.intervalid);

        $('.tm-btn-list', this.ele).empty().append(`
            <button class="tm-btn" data-btn-resume=''>继续</button>
            <button class="tm-btn" data-btn-reset=''>重置</button>
        `)
    }

    resume(){
        this.start();
    }

    reset(){
        this.minutes = 0;
        this.seconds = 0;
        this.startMinutes = 0;   // 当前次计次的开始时间
        this.startSeconds = 0;
        this.recordNo = 0;  // 计次序号，0开始

        $('.tm-btn-list', this.ele).empty().append(`
            <button class="tm-btn" data-btn-start=''>启动</button>
        `)

        $('.tm-record-list', this.ele).empty();
        
        this.refreshTimeVisual();
    }

    record(){
        let s = this.seconds;
        let m = this.minutes;
        let interval_s = s - this.startSeconds;
        let interval_m = m - this.startMinutes;
        if(interval_s < 0){
            interval_m -= 1;
            interval_s += 60;
        }
        let no = this.recordNo;

        this.startSeconds = s;
        this.startMinutes = m;
        this.recordNo +=1;

        $('.tm-record-list', this.ele).append(`
            <div class="tm-record">
                <div class="tm-record-name">${no + 1}</div>
                <div class="tm-record-time-end">${m}:${formatNumber(s)}</div>
                <div class="tm-record-time-usage">${interval_m}:${formatNumber(interval_s)}</div>
            </div>
        `);
    }

    increase(){
        this.increaseSeconds(0.1);
        this.refreshTimeVisual();
    }

    increaseSeconds(num){
        this.seconds += num;

        if(this.seconds >= 60){
            this.seconds -= 60;
            this.increaseMinutes();
        }
    }

    increaseMinutes(){
        this.minutes += 1;
    }

    refreshTimeVisual(){
        let s = this.seconds;
        let m = this.minutes;
        let record_s = s - this.startSeconds;
        let record_m = m - this.startMinutes;
        if(record_s < 0){
            record_m -= 1;
            record_s += 60;
        }
        
        $('.tm-time', this.ele).text(`${m}:${formatNumber(s)}`);
        $('.tm-record-time', this.ele).text(`${record_m}:${formatNumber(record_s)}`);
    }
}

var observer = new MutationObserver(function(mutations){
    for(var mutation of mutations){
        if(mutation.type == 'childList'){
            for(var node of mutation.addedNodes){
                if(node.nodeType == Node.ELEMENT_NODE && node.classList.contains('tm')){
                    node._tm = new TM(node);
                }
            }
        }
    }
});

observer.observe(document, { childList:true, subtree:true });



function formatNumber(num) {
    num = num.toFixed(1).toString();
    parts = num.split('.')
    parts[0] = parts[0].length >= 2 ? parts[0] : '0' + parts[0];
    return parts.join('.')
}