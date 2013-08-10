<?php 
/**
 * Apocrypha Loop Single Post Template
 * Andrew Clayton
 * Version 1.0
 * 8-9-2013
 */
?>
	
<div id="post-<?php the_ID(); ?>" class="<?php display_entry_class(); ?>">
	
	<header class="entry-header <?php home_header_class(); ?>">
		<h2 class="entry-title"><?php entry_header_title(); ?></h2>
		<p class="entry-byline"><?php entry_header_description(); ?></p>
	</header>
	
	<div class="entry-content">
		<?php get_the_image( array( 'meta_key' => 'Thumbnail', 'size' => 'thumbnail' ) );?>
		<div class="entry-excerpt">
			<?php the_excerpt(); ?>
		</div>
	</div>
	
	<footer class="entry-footer">
		<div class="entry-meta">
			<?php echo get_the_term_list( $post->ID, 'category', 'Posted In: ', ', ', '' ); ?> 
		</div>
		<?php apoc_comments_link(); ?>
	</footer>
	
</div>