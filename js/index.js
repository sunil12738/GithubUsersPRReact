// Get the repository name
function get_repo_name($url1){
	$url=$url1.toString();
	$position = $url.lastIndexOf("/");
	$url_len = $url.length;
	$repo_name = $url.substr($position+1,$url_len);
	return $repo_name;
}
