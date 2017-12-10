$(function() {
    $('.del').click(function(e) {
        let target = $(e.target); //一个触发事件的对象的引用
        let id = target.data('id');
        let tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE',
            url: '/admin/movie/list?id=' + id
        }).done(function(results) {
            if (results.success === 1) {
                if (tr.length > 0) {
                    tr.remove();
                }
            }
        })
    })
    $(".ctyDel").click(function(t) {
        let e = $(t.target),
            i = e.data("id"),
            s = $(".item-id-" + i);
        $.ajax({ type: "DELETE", url: "/admin/category/list?id=" + i }).done(function(t) {
            1 === t.success && s && s.remove()
        })
    })

    $(".userDel").click(function(t) {
        let e = $(t.target),
            i = e.data("id"),
            s = $(".item-id-" + i);
        $.ajax({ type: "DELETE", url: "/admin/user/list?id=" + i }).done(function(t) {
            1 === t.success && s && s.remove()
        })
    })



    $("#doubanMovie").blur(function() {
        let t = $(this).val();
        t && $.ajax({
            url: "https://api.douban.com/v2/movie/subject/" + t,
            cache: !0,
            type: "get",
            dataType: "jsonp",
            crossDomain: !0,
            jsonp: "callback"
        }).done(function(t) {
            let temp1 = t.images.large
            let temp2 = t.images.large
            let tmp = temp1.split(".")[2]
            let tmp2 = temp2.substr(0, 21)
            if ($("#inputTitle").val(t.title), $("#inputAka").val(t.aka[0]), $("#inputYear").val(t.year), $("#inputSummary").val(t.summary), $("#inputCountry").val(t.countries[0]), t.rating && $("#inputRating").val(t.rating.average), t.images && $('#inputPoster').val(tmp2 + "." + tmp + ".webp"), t.directors && $("#inputDoctor").val(t.directors[0].name), t.casts) {
                let a = "";
                t.casts.forEach(function(i, e) {
                    a += i.name, e < t.casts.length - 1 && (a += "/")
                }), $("#inputCasts").val(a)
            }
            if (t.genres) {
                let i = "";
                t.genres.forEach(function(a, e) {
                    i += a, e < t.genres.length - 1 && (i += "/")
                }), $("#inputGenres").val(i)
            }
        })
    })

    $('#douban').blur(function() {
        let id = $(this).val();

        if (id) {
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true, //跨域
                jsonp: 'callback',
                success: function(data) {
                    let temp1 = data.images.large
                    let temp2 = data.images.large
                    let tmp = temp1.split(".")[2]
                    let tmp2 = temp2.substr(0, 21)
                    $('#inputTitle').val(data.title);
                    $('#inputDoctor').val(data.directors[0].name); // 导演(多个)
                    $('#inputCountry').val(data.countries[0]); // 国家(多个)
                    $('#inputPoster').val(tmp2 + "." + tmp + ".webp");
                    $('#inputYear').val(data.year);
                    $('#inputSummary').val(data.summary);
                }
            })
        }
    })
})