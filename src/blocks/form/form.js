(()=>{
    console.log(222);

    $('.js-custom-uploader').change((e)=>{
        let $self = $(e.target);
        let files = e.target.files;
        console.log($self);
        console.log(files);

        if(files.length > 0 ){
            $self.closest('.f-uploader').addClass('not-empty')
            $self.closest('.f-uploader').find('.f-uploader__file-selected').text( files[0].name )
        } else {
            $self.closest('.f-uploader').removeClass('not-empty')
        }
    })


    function highlight(e) {
        $(e.target).addClass('highlight')
    }

    function unhighlight(e) {
        $(e.target).removeClass('highlight')
    }

    $('.js-file-uploader').on('dragover', (e)=>{
        e.preventDefault();
        highlight(e)
    });
    $('.js-file-uploader').on('dragenter', (e)=>{
        e.preventDefault();
    });

    $('.js-file-uploader').on('dragleave', (e)=>{
        e.preventDefault();
        unhighlight(e)
    });

    $('.js-file-uploader').on('drop', (e)=>{
        e.preventDefault();
        unhighlight(e);
        let fileInput = $(e.target).find('input[type="file"]').get(0),
            files = e.originalEvent.dataTransfer.files;



        fileInput.files = files;

        const dT = new DataTransfer();
        dT.items.add(files[0]);

        fileInput.files = dT.files;
        $(fileInput).trigger('change');
        e.preventDefault();
    });
})();