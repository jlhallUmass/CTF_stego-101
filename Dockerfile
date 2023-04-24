FROM httpd:latest

#copy our static webpages files into the image, and our modified httpd.conf
COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY web/ /usr/local/apache2/htdocs/

#ensure that the proper permissions are set for all of the files.
RUN find /usr/local/apache2/htdocs -type f -exec chmod 644 {} \;
RUN find /usr/local/apache2/htdocs -type d -exec chmod 755 {} \;
RUN chmod 644 /usr/local/apache2/conf/httpd.conf

#expose the http port
EXPOSE 80

#set the entrypoint to run the apache server in the foreground
ENTRYPOINT ["httpd-foreground"]
